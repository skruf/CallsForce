package io.laaver.callsforce;

import com.salesforce.androidsdk.reactnative.ui.SalesforceReactActivity;

public class MainActivity extends SalesforceReactActivity {

    /**
     *
     * @return true if you want login to happen when application launches
     *         false otherwise
     */
	@Override
	public boolean shouldAuthenticate() {
		return true;
	}

	/**
	 * Returns the name of the main component registered from JavaScript.
	 * This is used to schedule rendering of the component.
	 */
	@Override
	protected String getMainComponentName() {
		return "CallsForce";
	}
}
