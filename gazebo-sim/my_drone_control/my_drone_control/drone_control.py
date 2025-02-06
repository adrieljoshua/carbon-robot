import rclpy
from rclpy.node import Node
from geometry_msgs.msg import Twist

class DroneController(Node):
    def __init__(self):
        super().__init__('drone_controller')
        self.publisher_ = self.create_publisher(Twist, '/cmd_vel', 10)
        self.timer = self.create_timer(0.1, self.move_drone)

    def move_drone(self):
        msg = Twist()
        msg.linear.x = 1.0  # Move forward
        msg.angular.z = 0.0  # No rotation
        self.publisher_.publish(msg)
        self.get_logger().info("Moving drone forward...")

def main(args=None):
    rclpy.init(args=args)
    controller = DroneController()
    rclpy.spin(controller)
    rclpy.shutdown()

if __name__ == '__main__':
    main()

