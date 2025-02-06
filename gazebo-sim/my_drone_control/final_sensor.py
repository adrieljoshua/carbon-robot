import rclpy
from rclpy.node import Node
from rclpy.qos import QoSProfile, QoSReliabilityPolicy
from geometry_msgs.msg import PoseStamped
from mavros_msgs.srv import CommandBool, SetMode
from mavros_msgs.msg import State
from nav_msgs.msg import Odometry
import time


class OffboardControl(Node):
    def __init__(self):
        super().__init__('offboard_control')

        # Create publisher for position control
        self.pose_pub = self.create_publisher(PoseStamped, '/mavros/setpoint_position/local', 10)

        # QoS setting to match MAVROS
        qos_profile = QoSProfile(reliability=QoSReliabilityPolicy.BEST_EFFORT, depth=10)

        # Create subscribers
        self.local_pos_sub = self.create_subscription(Odometry, '/mavros/local_position/odom', self.local_position_callback, qos_profile)
        self.state_sub = self.create_subscription(State, '/mavros/state', self.state_callback, 10)

        # Create service clients (arming & mode change)
        self.arming_client = self.create_client(CommandBool, '/mavros/cmd/arming')
        self.set_mode_client = self.create_client(SetMode, '/mavros/set_mode')

        # Ensure services are available
        while not self.arming_client.wait_for_service(timeout_sec=1.0):
            self.get_logger().info('Waiting for arming service...')
        while not self.set_mode_client.wait_for_service(timeout_sec=1.0):
            self.get_logger().info('Waiting for set_mode service...')

        # Timer to continuously send position setpoints (10 Hz)
        self.timer = self.create_timer(0.1, self.publish_pose)

        # Setpoints (Sequence)
        self.setpoints = [
            [0.0, 0.0, 2.0],    # Takeoff position
            [5.0, 5.0, 2.0],    # Second setpoint
            [10.0, -10.0, 2.0], # Third setpoint
            [-5.0, -5.0, 2.0],  # Fourth setpoint
        ]
        self.current_setpoint_index = 0  # Start at first setpoint

        # Initialize pose
        self.pose = PoseStamped()
        self.update_pose()

        self.reached_setpoint = False  # Flag to track if a setpoint is reached
        self.current_state = None  # Track MAVROS state

    def update_pose(self):
        """ Updates the current pose based on the active setpoint index. """
        self.pose.pose.position.x = self.setpoints[self.current_setpoint_index][0]
        self.pose.pose.position.y = self.setpoints[self.current_setpoint_index][1]
        self.pose.pose.position.z = self.setpoints[self.current_setpoint_index][2]

    def publish_pose(self):
        """ Continuously publish position to maintain navigation """
        self.pose.header.stamp = self.get_clock().now().to_msg()
        self.pose_pub.publish(self.pose)

    def arm_and_takeoff(self):
        """ Arm the drone and switch to OFFBOARD mode """
        self.get_logger().info('Publishing initial setpoints...')
        for _ in range(10):  # Publish some setpoints before switching modes
            self.publish_pose()
            time.sleep(0.1)

        self.get_logger().info('Switching to OFFBOARD mode...')
        mode_req = SetMode.Request()
        mode_req.custom_mode = 'OFFBOARD'
        self.set_mode_client.call_async(mode_req)

        time.sleep(2)

        self.get_logger().info('Arming drone...')
        arm_req = CommandBool.Request()
        arm_req.value = True
        self.arming_client.call_async(arm_req)

        self.get_logger().info('Drone should now be taking off...')

    def local_position_callback(self, msg):
        """ Check if the drone reaches the current setpoint """
        current_position = msg.pose.pose.position
        target_position = self.setpoints[self.current_setpoint_index]

        # Check if the drone is close to the target position
        if (abs(current_position.x - target_position[0]) < 0.2 and
            abs(current_position.y - target_position[1]) < 0.2 and
            abs(current_position.z - target_position[2]) < 0.2):

            if not self.reached_setpoint:
                self.reached_setpoint = True
                self.get_logger().info(f'🎉 Setpoint {self.current_setpoint_index + 1} reached: {target_position}')

                # Hover at the setpoint for 5 seconds
                self.get_logger().info(f'🛑 Holding position for 5 seconds...')
                time.sleep(5)

                # Move to the next setpoint if available
                if self.current_setpoint_index < len(self.setpoints) - 1:
                    self.current_setpoint_index += 1
                    self.update_pose()
                    self.reached_setpoint = False  # Reset flag for next setpoint
                else:
                    self.get_logger().info('🎉 All setpoints reached!')

    def state_callback(self, msg):
        """ Monitor MAVROS state """
        self.current_state = msg


def main(args=None):
    rclpy.init(args=args)
    node = OffboardControl()
    node.arm_and_takeoff()
    rclpy.spin(node)
    node.destroy_node()
    rclpy.shutdown()


if __name__ == '__main__':
    main()

