/*
       Licensed to the Apache Software Foundation (ASF) under one
       or more contributor license agreements.  See the NOTICE file
       distributed with this work for additional information
       regarding copyright ownership.  The ASF licenses this file
       to you under the Apache License, Version 2.0 (the
       "License"); you may not use this file except in compliance
       with the License.  You may obtain a copy of the License at

         http://www.apache.org/licenses/LICENSE-2.0

       Unless required by applicable law or agreed to in writing,
       software distributed under the License is distributed on an
       "AS IS" BASIS, WITHOUT WARRANTIES OR CONDITIONS OF ANY
       KIND, either express or implied.  See the License for the
       specific language governing permissions and limitations
       under the License.
*/
package org.apache.cordova.startapp;

import org.apache.cordova.CallbackContext;
import org.apache.cordova.CordovaPlugin;
import org.json.JSONArray;
import org.json.JSONObject;
import org.json.JSONException;

import android.content.Context;
import android.content.Intent;
import android.content.ComponentName;
import android.content.pm.PackageManager;
import java.util.Iterator;
import android.net.Uri;

/**
 * This class provides access to vibration on the device.
 */
public class startApp extends CordovaPlugin {

    /**
     * Constructor.
     */
    public startApp() { }

    /**
     * Executes the request and returns PluginResult.
     *
     * @param action            The action to execute.
     * @param args              JSONArray of arguments for the plugin.
     * @param callbackContext   The callback context used when calling back into JavaScript.
     * @return                  True when the action was valid, false otherwise.
     */
    public boolean execute(String action, JSONArray args, CallbackContext callbackContext) throws JSONException {
        if (action.equals("start")) {
            this.start(args, callbackContext);
        }
		else if(action.equals("check")) {
			this.check(args.getString(0), callbackContext);
		}
		
		return true;
    }

    //--------------------------------------------------------------------------
    // LOCAL METHODS
    //--------------------------------------------------------------------------
    /**
     * startApp
     */
    public void start(JSONArray args, CallbackContext callback) {
		/**
		 * arguments
		 * ['com.application.name']
		 */
		String com_name = null;
		String activity = null;
		Intent LaunchIntent;
		
		try {
			if (args.get(0) instanceof JSONArray) {
				com_name = args.getJSONArray(0).getString(0);
				activity = args.getJSONArray(0).getString(1);                     
			}
			else {
				com_name = args.getString(0);
			}
		
			/**
			 * call activity
			 */
			if(activity != null) {
				if(com_name.equals("action")) {
					// sample: android.intent.action.VIEW
					LaunchIntent = new Intent("android.intent.action." + activity);
				}
				else {
					LaunchIntent = new Intent();
					LaunchIntent.setComponent(new ComponentName(com_name, activity));
				}
			}
			else {
				LaunchIntent = this.cordova.getActivity().getPackageManager().getLaunchIntentForPackage(com_name);
			}
			
			/**
			 * put arguments
			 */
			if(args.length() > 1) {
				JSONArray params = args.getJSONArray(1);
				JSONObject key_value;
				String key;
				String value;

				for(int i = 0; i < params.length(); i++) {
					if (params.get(i) instanceof JSONObject) {
						Iterator<String> iter = params.getJSONObject(i).keys();
						
						 while (iter.hasNext()) {
							key = iter.next();
							try {
								value = params.getJSONObject(i).getString(key);
								
								LaunchIntent.putExtra(key, value);
							} catch (JSONException e) {
								callback.error("json params: " + e.toString());
							}
						}
					}
					else {
						LaunchIntent.setData(Uri.parse(params.getString(i)));
					}
				}
			}
			
			this.cordova.getActivity().startActivity(LaunchIntent);
			callback.success();
			
		} catch (JSONException e) {
			callback.error("json: " + e.toString());
		} catch (Exception e) {
			callback.error("intent: " + e.toString());
        }
    }

    /**
     * checkApp
     */	 
	public void check(String component, CallbackContext callback) {
		PackageManager pm = this.cordova.getActivity().getApplicationContext().getPackageManager();
		try {
			pm.getPackageInfo(component, PackageManager.GET_ACTIVITIES);
			callback.success();
		} catch (Exception e) {
			callback.error(e.toString());
		}
	}
}
