import { useLayoutEffect } from 'react';
import { useNavigationFeature } from '../navigation';

export const BrowserUpdate = () => {
  const navigation = useNavigationFeature();
  useLayoutEffect(() => {
    const browserUpdate = require('browser-update/update.npm.js');
    if (browserUpdate) {
      browserUpdate({
        onshow: (infos: any) => {
          navigation.actions.push.trigger({ path: '/outdated-browser/' });
        },

        reminder: 24,
        // after how many hours should the message reappear
        // 0 = show all the time

        reminderClosed: 150,
        // if the user explicitly closes message it reappears after x hours

        required: { e: -3, f: -3, o: -3, s: -1, c: -3 },
        // Specifies required browser versions
        // Browsers older than this will be notified.
        // f:22 ---> Firefox < 22 gets notified
        // Negative numbers specify how much versions behind current version.
        // c:-5 ---> Chrome < 35  gets notified if latest Chrome version is 40.
        // more details (in english)

        l: false,
        // set a fixed language for the message, e.g. "en". This overrides the default detection.

        test: false,
        // true = always show the bar (for testing)

        text: '',
        // custom notification text (html)
        // Placeholders {brow_name} will be replaced with the browser name, {up_but} with contents of the update link tag and {ignore_but} with contents for the ignore link.
        // Example: "Your browser, {brow_name}, is too old: <a{up_but}>update</a> or <a{ignore_but}>ignore</a>."
        // more details (in english)

        text_in_xx: '',
        // custom notification text for language "xx"
        // e.g. text_de for german and text_it for italian

        newwindow: true,
        // open link in new window/tab

        url: null,
        // the url to go to after clicking the notification

        noclose: false,
        // Do not show the "ignore" button to close the notification

        nomessage: true,
        // Do not show a message if the browser is out of date, just call the onshow callback function

        jsshowurl: '//browser-update.org/update.show.min.js',
        // URL where the script, that shows the notification, is located. This is only loaded if the user actually has an outdated browser.

        container: document.body,
        // DOM Element where the notification will be injected.

        no_permanent_hide: false,
        // Do not give the user the option to permanently hide the notification

        api: 'xxx',
        // This is the version of the browser-update api to use. Please do not remove.
      });
    }
  }, []);

  return null;
};
