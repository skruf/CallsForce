package io.laaver.callsforce;

import android.app.Application;

import com.facebook.react.PackageList;
import com.facebook.react.ReactApplication;
import com.facebook.react.ReactNativeHost;
import com.facebook.react.ReactPackage;
import com.facebook.soloader.SoLoader;
import com.salesforce.androidsdk.BuildConfig;
import com.salesforce.androidsdk.reactnative.app.SalesforceReactSDKManager;
import io.wazo.callkeep.RNCallKeepPackage;

import java.util.List;

/**
 * Application class for our application.
 */
public class MainApplication extends Application implements ReactApplication {

	private final ReactNativeHost mReactNativeHost = new ReactNativeHost(this) {
		@Override
		public boolean getUseDeveloperSupport() {
			return BuildConfig.DEBUG;
		}

		@Override
		protected List<ReactPackage> getPackages() {
			@SuppressWarnings("UnnecessaryLocalVariable")
			List<ReactPackage> packages = new PackageList(this).getPackages();
			// Packages that cannot be autolinked yet can be added manually here, for example:
			// packages.add(new MyReactNativePackage());
			packages.add(SalesforceReactSDKManager.getInstance().getReactPackage());
			return packages;
		}

		@Override
		protected String getJSMainModuleName() {
			return "index";
		}
	};

	@Override
	public ReactNativeHost getReactNativeHost() {
		return mReactNativeHost;
	}

	@Override
	public void onCreate() {
		super.onCreate();
		SoLoader.init(this, /* native exopackage */ false);
		SalesforceReactSDKManager.initReactNative(getApplicationContext(), MainActivity.class);

		/*
         * Uncomment the following line to enable IDP login flow. This will allow the user to
         * either authenticate using the current app or use a designated IDP app for login.
         * Replace 'idpAppURIScheme' with the URI scheme of the IDP app meant to be used.
         */
		// SalesforceReactSDKManager.getInstance().setIDPAppURIScheme(idpAppURIScheme);

        /*
		 * Un-comment the line below to enable push notifications in this app.
		 * Replace 'pnInterface' with your implementation of 'PushNotificationInterface'.
		 * Add your Google package ID in 'bootonfig.xml', as the value
		 * for the key 'androidPushNotificationClientId'.
		 */
        // SalesforceReactSDKManager.getInstance().setPushNotificationReceiver(pnInterface);
	}
}
