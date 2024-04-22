package com.vocket;

import android.graphics.Bitmap;
import android.graphics.BitmapFactory;
import android.graphics.Canvas;
import android.graphics.Matrix;
import android.graphics.Paint;
import android.graphics.PorterDuff;
import android.graphics.PorterDuffXfermode;
import android.graphics.drawable.Drawable;
import android.transition.Transition;
import android.util.Base64;
import android.util.Log;

import androidx.annotation.NonNull;
import androidx.annotation.Nullable;

import com.bumptech.glide.Glide;
import com.bumptech.glide.load.resource.bitmap.Rotate;
import com.bumptech.glide.load.resource.bitmap.RoundedCorners;
import com.bumptech.glide.request.RequestOptions;
import com.bumptech.glide.request.target.SimpleTarget;
import com.facebook.react.bridge.Promise;
import com.facebook.react.bridge.ReactApplicationContext;
import com.facebook.react.bridge.ReactContextBaseJavaModule;
import com.facebook.react.bridge.ReactMethod;

import java.io.ByteArrayOutputStream;
import java.io.File;
import java.io.FileNotFoundException;
import java.io.FileOutputStream;
import java.io.IOException;

public class ImageProcessingModule extends ReactContextBaseJavaModule {

    public ImageProcessingModule(@Nullable ReactApplicationContext reactContext) {
        super(reactContext);
    }

    @NonNull
    @Override
    public String getName() {
        return "ImageProcessingModule";
    }


    private String saveBitmap(Bitmap bitmap) {
        String timestamp = String.valueOf(System.currentTimeMillis());
        String filename = "processed_image_" + timestamp + ".png";

        File outputDir = getReactApplicationContext().getCacheDir();
        File outputFile = new File(outputDir, filename);

        try {
            FileOutputStream outputStream = new FileOutputStream(outputFile);
            bitmap.compress(Bitmap.CompressFormat.PNG, 100, outputStream);
            outputStream.close();
            return outputFile.getAbsolutePath();
        } catch (IOException e) {
            e.printStackTrace();
            return null;
        }
    }

    @ReactMethod
    public void processImage(String imagePath, int rotateDegrees, int borderRadius, Promise promise) {
        RequestOptions requestOptions = new RequestOptions()
                .transforms(new Rotate(rotateDegrees));

        Glide.with(getReactApplicationContext())
                .asBitmap()
                .load(imagePath)
                .apply(requestOptions)
                .into(new SimpleTarget<Bitmap>() {
                    @Override
                    public void onLoadFailed(@Nullable Drawable errorDrawable) {
                        promise.reject("IMAGE_LOADING_FAILED", "Failed to load image");
                    }

                    @Override
                    public void onResourceReady(@NonNull Bitmap resource, @Nullable com.bumptech.glide.request.transition.Transition<? super Bitmap> transition) {
                        String processedImagePath = saveBitmap(resource);
                        if (processedImagePath != null) {
                            promise.resolve(processedImagePath);
                        } else {
                            promise.reject("IMAGE_PROCESSING_FAILED", "Failed to save processed image");
                        }
                    }
                });
    }

}
