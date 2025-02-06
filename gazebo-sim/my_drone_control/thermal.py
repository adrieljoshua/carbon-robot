import rclpy
from rclpy.node import Node
from rclpy.qos import QoSProfile, QoSReliabilityPolicy  # Import QoS settings
from geometry_msgs.msg import PoseStamped
from mavros_msgs.srv import CommandBool, SetMode
from sensor_msgs.msg import NavSatFix, LaserScan, Temperature
import time
import math
import random

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
        self.pose.pose.position.z = 2.0  # Drone's height above the ground

        # Create publisher for fake lidar data
        self.lidar_pub = self.create_publisher(LaserScan, '/gazebo/default/iris/base_link/lidar/scan', 10)

        # Timer to publish fake lidar data (10 Hz)
        self.lidar_timer = self.create_timer(0.1, self.publish_fake_lidar)

        # Create publisher for fake thermal data
        self.thermal_pub = self.create_publisher(Temperature, '/gazebo/default/iris/base_link/thermal', 10)

        # Timer to publish fake thermal data (10 Hz)
        self.thermal_timer = self.create_timer(0.1, self.publish_fake_thermal)

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

    def publish_fake_lidar(self):
        """ Publish fake lidar data and print values relative to the ground """
        lidar_msg = LaserScan()
        lidar_msg.header.stamp = self.get_clock().now().to_msg()
        lidar_msg.header.frame_id = 'base_link'

        # Fake lidar parameters (assuming 360 degrees scan)
        lidar_msg.angle_min = -math.pi  # -180 degrees
        lidar_msg.angle_max = math.pi   # 180 degrees
        lidar_msg.angle_increment = math.pi / 180  # 1 degree increment
        lidar_msg.time_increment = 0.0  # Not simulating time increment
        lidar_msg.scan_time = 1.0  # 1 second scan
        lidar_msg.range_min = 0.0  # Minimum range (m)
        lidar_msg.range_max = 10.0  # Maximum range (m)

        # Simulate lidar ranges, factoring in the altitude
        lidar_msg.ranges = []
        for i in range(360):  # 360 readings for a full scan
            # Calculate a base distance based on altitude
            base_distance = 5.0 + random.uniform(-1, 1)  # Add some random noise to simulate environment

            # Adjust the distance based on the drone's altitude
            adjusted_distance = base_distance - (self.pose.pose.position.z * 0.2)  # Adjust more at higher altitudes
            adjusted_distance = max(adjusted_distance, 0.5)  # Prevent negative or zero distances

            # Round the lidar distance value to 2 decimal places
            rounded_distance = round(adjusted_distance, 2)

            lidar_msg.ranges.append(rounded_distance)

        # Print the lidar values relative to the ground
        self.get_logger().info(f"Lidar values relative to ground (z={self.pose.pose.position.z}m): {lidar_msg.ranges[:10]}...")  # Print first 10 values

        self.lidar_pub.publish(lidar_msg)

    def publish_fake_thermal(self):
        """ Publish fake thermal data (temperature) """
        thermal_msg = Temperature()
        thermal_msg.header.stamp = self.get_clock().now().to_msg()
        thermal_msg.header.frame_id = 'base_link'

        # Simulate thermal temperature values
        base_temperature = 20.0  # Assume a base temperature of 20°C (room temperature)
        
        # Introduce environmental noise
        noise = random.uniform(-2.0, 2.0)  # Noise to simulate varying environmental temperatures

        # Adjust the temperature based on altitude
        adjusted_temperature = base_temperature + noise - (self.pose.pose.position.z * 0.1)  # Decrease temperature as altitude increases
        adjusted_temperature = max(adjusted_temperature, 10.0)  # Ensure the temperature doesn't go below 10°C

        # Round the thermal temperature value
        rounded_temperature = round(adjusted_temperature, 2)

        thermal_msg.temperature = rounded_temperature

        # Print the thermal value relative to the ground
        self.get_logger().info(f"Thermal temperature relative to ground (z={self.pose.pose.position.z}m): {thermal_msg.temperature}°C")

        self.thermal_pub.publish(thermal_msg)

def main(args=None):
    rclpy.init(args=args)
    node = OffboardControl()
    node.arm_and_takeoff()
    rclpy.spin(node)
    node.destroy_node()
    rclpy.shutdown()

if __name__ == '__main__':
    main()

