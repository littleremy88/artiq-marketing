/** Store links — update Apple ID after App Store Connect submission */
export const APPLE_APP_STORE_ID = "";
export const ANDROID_PACKAGE_NAME = "com.artiq.app";

export const getIosStoreUrl = (): string | null => {
  if (!APPLE_APP_STORE_ID) return null;
  return `https://apps.apple.com/app/id${APPLE_APP_STORE_ID}`;
};

export const getAndroidStoreUrl = (): string =>
  `https://play.google.com/store/apps/details?id=${ANDROID_PACKAGE_NAME}`;
