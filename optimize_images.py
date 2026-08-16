#!/usr/bin/env python3
"""
Image optimization script for portfolio website
Reduces file sizes while maintaining acceptable quality
"""

from PIL import Image
import os

# Image folder path
image_folder = r"c:\Users\PRAKASH\Downloads\Portfolio-Website-Template-main\Portfolio-Website-Template-main\images"

# Image optimization settings
# Format: {filename: (max_width, max_height, quality, format)}
images_to_optimize = {
    'image.png': (800, 800, 85, 'JPEG'),  # Hero image - convert PNG to JPEG and resize
    'Piramanayagam.jpeg': (500, 600, 80, 'JPEG'),  # About image - resize and compress
    'Pro 1.png': (600, 400, 85, 'JPEG'),  # Project image - convert to JPEG
    'Pro 2.png': (600, 400, 85, 'JPEG'),  # Project image - convert to JPEG
    'Pro 3.png': (600, 400, 85, 'JPEG'),  # Project image - keep as is (already small)
    'bg_1.jpg': (1920, 1080, 75, 'JPEG'),  # Background image - large but compressed
}

print("=" * 60)
print("IMAGE OPTIMIZATION SCRIPT")
print("=" * 60)

for filename, (max_width, max_height, quality, output_format) in images_to_optimize.items():
    input_path = os.path.join(image_folder, filename)
    
    if not os.path.exists(input_path):
        print(f"⚠️  SKIP: {filename} - FILE NOT FOUND")
        continue
    
    # Get file size before optimization
    original_size = os.path.getsize(input_path) / (1024 * 1024)  # Convert to MB
    
    try:
        # Open image
        img = Image.open(input_path)
        
        # Convert RGBA to RGB if converting to JPEG
        if output_format == 'JPEG' and img.mode in ('RGBA', 'LA', 'P'):
            # Create white background
            background = Image.new('RGB', img.size, (255, 255, 255))
            background.paste(img, mask=img.split()[-1] if img.mode == 'RGBA' else None)
            img = background
        
        # Resize image while maintaining aspect ratio
        img.thumbnail((max_width, max_height), Image.Resampling.LANCZOS)
        
        # Prepare output path and filename
        name_without_ext = os.path.splitext(filename)[0]
        
        if output_format == 'JPEG':
            output_filename = f"{name_without_ext}.jpg"
        else:
            output_filename = f"{name_without_ext}.{output_format.lower()}"
        
        output_path = os.path.join(image_folder, output_filename)
        
        # Save optimized image
        if output_format == 'JPEG':
            img.save(output_path, 'JPEG', quality=quality, optimize=True)
        else:
            img.save(output_path, output_format, optimize=True)
        
        # Get file size after optimization
        optimized_size = os.path.getsize(output_path) / (1024 * 1024)  # Convert to MB
        reduction = ((original_size - optimized_size) / original_size) * 100
        
        print(f"✓ {filename}")
        print(f"  Original: {original_size:.2f} MB → Optimized: {optimized_size:.2f} MB ({reduction:.1f}% reduction)")
        print(f"  Resized to: {img.width}x{img.height} | Format: {output_format}")
        
        # If output format changed, remove old file
        if output_filename != filename:
            if os.path.exists(input_path):
                os.remove(input_path)
                print(f"  Removed old file: {filename}")
            print(f"  New file: {output_filename}")
        
        print()
    
    except Exception as e:
        print(f"✗ ERROR processing {filename}: {str(e)}")
        print()

print("=" * 60)
print("IMAGE OPTIMIZATION COMPLETE")
print("=" * 60)
