
import sys
import os

try:
    from PIL import Image
except ImportError:
    print("PIL/Pillow not installed")
    sys.exit(1)

input_path = sys.argv[1]
output_path = sys.argv[2]

try:
    print(f"Opening {input_path}")
    img = Image.open(input_path)
    print(f"Saving to {output_path}")
    img.save(output_path, 'WEBP', quality=85)
    print("Success")
except Exception as e:
    print(f"Error converting: {e}")
    sys.exit(1)
