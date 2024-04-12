package com.vocket;

import android.database.Cursor;
import android.net.Uri;
import android.provider.MediaStore;
import android.util.Log;

import androidx.annotation.NonNull;

import com.facebook.react.bridge.Callback;
import com.facebook.react.bridge.ReactApplicationContext;
import com.facebook.react.bridge.ReactContextBaseJavaModule;
import com.facebook.react.bridge.ReactMethod;
import com.google.gson.Gson;

import java.util.ArrayList;
import java.util.List;

public class MyImagesNativeModule extends ReactContextBaseJavaModule {

    private final ReactApplicationContext reactContext;

    public MyImagesNativeModule(ReactApplicationContext reactContext) {
        this.reactContext = reactContext;
    }

    @NonNull
    @Override
    public String getName() {
        return "MyImagesNativeModule";
    }

    @ReactMethod
    public void getAllImages(Callback successCallback) {
        List<String> imagePaths = new ArrayList<>();
        Uri uri = MediaStore.Images.Media.EXTERNAL_CONTENT_URI;
        String[] projection = {MediaStore.Images.Media.DATA};
        String sortOrder = MediaStore.Images.Media.DATE_MODIFIED + " DESC";
        Cursor cursor = reactContext.getContentResolver().query(uri, projection, null, null, sortOrder);
        if (cursor != null) {
            while (cursor.moveToNext()) {
                String imagePath = cursor.getString(cursor.getColumnIndexOrThrow(MediaStore.Images.Media.DATA));
                imagePaths.add(imagePath);
                Log.d("imagePaths", "getAllImages: " + imagePaths);
            }
            cursor.close();
        }
        Gson gson = new Gson();
        String jsonImagePaths = gson.toJson(imagePaths);
        successCallback.invoke(jsonImagePaths);
    }
}
