import React from "react";
import Link from "next/link";

const cookiePolicy = () => {
  return (
    <section className="bg-gray-100 min-h-screen p-8">
      <div className="bg-white p-8 rounded shadow-md">
        <h1 className="text-2xl font-bold mb-4">
          Cookie Policy for Todo Tasker
        </h1>
        <p className="mb-4">
          <strong>Last Updated: 8.9.23</strong>
        </p>

        <p className="mb-4">
          Welcome to Todo Tasker&apos;s Cookie Policy. This policy outlines our
          practices regarding the use of cookies on our web application.
        </p>

        <h2 className="text-xl font-semibold mt-4 mb-2">
          1. What are cookies?
        </h2>
        <p className="mb-4">
          Cookies are small text files stored on your device when you access
          most websites on the internet or open certain emails. They allow the
          website to recognize your device and remember if you&apos;ve been to
          the website before.
        </p>

        <h2 className="text-xl font-semibold mt-4 mb-2">
          2. Why do we use cookies?
        </h2>
        <p className="mb-4">
          Our web application uses cookies for several purposes:
        </p>
        <ul className="list-disc pl-5 mb-4">
          <li className="mb-2">
            User Authentication: To keep you logged in as you navigate between
            pages or on subsequent visits so you don&rsquo;t need to log in
            again.
          </li>
          <li className="mb-2">
            Preferences and Settings: To remember information about you such as
            your preferred language and configuration settings.
          </li>
          <li className="mb-2">
            Performance and Analytics: To analyze how our services are accessed,
            used, or performing and use this information to maintain, operate,
            and improve our services.
          </li>
        </ul>

        <h2 className="text-xl font-semibold mt-4 mb-2">
          3. Types of cookies we use
        </h2>
        <ul className="list-disc pl-5 mb-4">
          <li className="mb-2">
            Session Cookies: Temporary cookies that remain in the cookie file of
            your browser until you close the browser. We use session cookies to
            maintain your session while you use our web application.
          </li>
          <li className="mb-2">
            Persistent Cookies: These remain in your browser for a longer period
            of time. They are used to remember your login details and password
            so you don&rsquo;t have to type them in every time you use our site.
          </li>
        </ul>

        <h2 className="text-xl font-semibold mt-4 mb-2">
          4. Third-party cookies
        </h2>
        <p className="mb-4">
          While our primary goal is to enhance your user experience, certain
          third-party services integrated into our platform may use cookies.
          These might include analytics tools like Google Analytics. These
          cookies are not under our control, and you should consult the
          third-party&apos;s privacy policy for more information.
        </p>

        <h2 className="text-xl font-semibold mt-4 mb-2">
          5. Managing and Disabling Cookies
        </h2>
        <p className="mb-4">
          Most browsers allow you to refuse to accept cookies and to delete
          cookies. The methods for doing so vary from browser to browser, and
          from version to version. However, blocking all cookies will have a
          negative impact upon the usability of many websites, including ours.
        </p>

        <h2 className="text-xl font-semibold mt-4 mb-2">
          6. Changes to this Cookie Policy
        </h2>
        <p className="mb-4">
          We may update our Cookie Policy from time to time. Any changes will be
          posted on this page, and if significant, we will provide a more
          prominent notice, including, for certain services, email notification
          of changes.
        </p>

        <h2 className="text-xl font-semibold mt-4 mb-2">7. Contact Us</h2>
        <p>
          For any questions or concerns regarding our Cookie Policy, please
          contact us at{" "}
          <Link href={"mailto:alfredo012017@yahoo.com"}>
            alfredo012017@yahoo.com
          </Link>
          .
        </p>
      </div>
    </section>
  );
};

export default cookiePolicy;
