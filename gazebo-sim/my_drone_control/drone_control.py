import rclpy
from rclpy.node import Node
from rclpy.qos import QoSProfile, QoSReliabilityPolicy  # Import QoS settings
from geometry_msgs.msg import PoseStamped
from mavros_msgs.srv import CommandBool, SetMode
from sensor_msgs.msg import NavSatFix
import time

class OffboardControl(Node):
    def __init__(self):
        super().__init__('offboard_control')

        # Create publisher for position control
        self.pose_pub = self.create_publisher(PoseStamped, '/mavros/setpoint_position/local', 10)

        # QoS setting to match MAVROS
        qos_profile = QoSProfile(reliability=QoSReliabilityPolicy.BEST_EFFORT, depth=10)

        # Create subscriber for GPS data (with proper QoS)
        self.gps_sub = self.create_subscription(NavSatFix, '/mavros/global_position/global', self.gps_callback, qos_profile)

        # Create clients for services (arming & mode change)
        self.arming_client = self.create_client(CommandBool, '/mavros/cmd/arming')
        self.set_mode_client = self.create_client(SetMode, '/mavros/set_mode')

        # Ensure services are available
        while not self.arming_client.wait_for_service(timeout_sec=1.0):
            self.get_logger().info('Waiting for arming service...')
        while not self.set_mode_client.wait_for_service(timeout_sec=1.0):
            self.get_logger().info('Waiting for set_mode service...')

        # Timer to continuously send position setpoints (10 Hz)
        self.timer = self.create_timer(0.1, self.publish_pose)
        
        # Setpoint position (hover at 2m)
        self.pose = PoseStamped()
        self.pose.pose.position.x = 0.0
        self.pose.pose.position.y = 0.0
        self.pose.pose.position.z = 2.0

    def publish_pose(self):
        """ Continuously publish position to maintain hover """
        self.pose.header.stamp = self.get_clock().now().to_msg()
        self.pose_pub.publish(self.pose)

    def arm_and_takeoff(self):
        """ Arm the drone and switch to OFFBOARD mode """
        self.get_logger().info('Setting OFFBOARD mode...')
        mode_req = SetMode.Request()
        mode_req.custom_mode = 'OFFBOARD'
        self.set_mode_client.call_async(mode_req)

        time.sleep(2)

        self.get_logger().info('Arming drone...')
        arm_req = CommandBool.Request()
        arm_req.value = True
        self.arming_client.call_async(arm_req)

    def gps_callback(self, msg):
        """ Callback function to print GPS data """
        #self.get_logger().info(f"📍 Latitude: {msg.latitude}, Longitude: {msg.longitude}, Altitude: {msg.altitude}")

def main(args=None):
    rclpy.init(args=args)
    node = OffboardControl()
    node.arm_and_takeoff()
    rclpy.spin(node)
    node.destroy_node()
    rclpy.shutdown()

if __name__ == '__main__':
    main()

