import React from "react";
import Link from "next/link";

const privacyPolicy = () => {
  return (
    <section className="bg-gray-100 min-h-screen p-8">
      <div className="bg-white p-8 rounded shadow-md">
        <h1 className="text-2xl font-bold mb-4">
          Privacy Policy for Todo Tasker
        </h1>
        <p className="mb-4">
          <strong>Last Updated: [Date]</strong>
        </p>

        <p className="mb-4">
          Welcome to Todo Tasker, a todo web application (&quot;we&quot;,
          &quot;our&quot;, or &quot;us&quot;). This Privacy Policy outlines our
          practices regarding the collection, use, and sharing of your personal
          information. By using our application, you agree to the terms of this
          Privacy Policy.
        </p>

        <h2 className="text-xl font-semibold mt-4 mb-2">
          1. Information We Collect
        </h2>
        <ul className="list-disc pl-5 mb-4">
          <li className="mb-2">
            <strong>Account Information</strong>: When you sign up for an
            account, you provide us with your email address and other relevant
            details.
          </li>
          <li className="mb-2">
            <strong>Social Login</strong>: If you log in using Google, Facebook,
            or GitHub, we receive information from these platforms, such as your
            name, profile picture, and email address.
          </li>
          <li className="mb-2">
            <strong>Usage Data</strong>: We collect data about your interactions
            with our application, including the tasks you create, modify, or
            delete.
          </li>
        </ul>

        <h2 className="text-xl font-semibold mt-4 mb-2">
          2. How We Use Your Information
        </h2>
        <ul className="list-disc pl-5 mb-4">
          <li className="mb-2">
            <strong>To Provide Our Service</strong>: We use your information to
            enable you to create, manage, and modify your todo lists.
          </li>
          <li className="mb-2">
            <strong>For Communication</strong>: We may use your email address to
            send you updates, notifications, or changes to our terms,
            conditions, and policies.
          </li>
          <li className="mb-2">
            <strong>For Improvement</strong>: We analyze usage data to enhance
            our application and offer a better user experience.
          </li>
        </ul>

        <h2 className="text-xl font-semibold mt-4 mb-2">
          3. Sharing Your Information
        </h2>
        <p className="mb-4">
          We do not sell your personal information. We may share your
          information:
        </p>
        <ul className="list-disc pl-5 mb-4">
          <li className="mb-2">
            With third-party service providers who perform services on our
            behalf.
          </li>
          <li className="mb-2">
            If required by law, including any Florida state laws or regulations,
            or to protect our rights, property, or safety, or that of others.
          </li>
          <li className="mb-2">
            In connection with any merger, sale, or acquisition of all or a part
            of our assets.
          </li>
        </ul>

        <h2 className="text-xl font-semibold mt-4 mb-2">4. Security</h2>
        <p className="mb-4">
          We implement security measures consistent with industry standards to
          protect your information. However, no method of transmission or
          storage is 100% secure. While we strive to protect your personal
          information, we cannot guarantee its absolute security.
        </p>

        <h2 className="text-xl font-semibold mt-4 mb-2">
          5. Your Choices and Rights
        </h2>
        <ul className="list-disc pl-5 mb-4">
          <li className="mb-2">
            <strong>Access and Correction</strong>: You can access, modify, or
            delete your personal information at any time by sending us a quick
            email at{" "}
            <Link href={"mailto:alfredo012017@yahoo.com"}>
              alfredo012017@yahoo.com
            </Link>
            .
          </li>
          <li className="mb-2">
            <strong>Opt-Out</strong>: If you wish to opt-out of any marketing
            communications, you can do so by following the unsubscribe link in
            our emails.
          </li>
          <li className="mb-2">
            <strong>Deletion</strong>: If you wish to deactivate your account or
            request that we delete your personal information, please contact us
            at{" "}
            <Link href={"mailto:alfredo012017@yahoo.com"}>
              alfredo012017@yahoo.com
            </Link>
            .
          </li>
        </ul>

        <h2 className="text-xl font-semibold mt-4 mb-2">
          6. Florida Residents
        </h2>
        <p className="mb-4">
          Florida residents may have additional rights regarding their personal
          information. If you are a resident of Florida and have questions about
          your rights or wish to exercise them, please contact us.
        </p>

        <h2 className="text-xl font-semibold mt-4 mb-2">
          7. Changes to This Policy
        </h2>
        <p className="mb-4">
          We may update this Privacy Policy periodically to reflect changes in
          our practices or for other operational, legal, or regulatory reasons.
          We will notify you of any significant changes by posting the new
          Privacy Policy on this page and updating the &quot;Last Updated&quot;
          date.
        </p>

        <h2 className="text-xl font-semibold mt-4 mb-2">8. Contact Us</h2>
        <p>
          For more information about our privacy practices, or if you have
          questions or concerns, please contact us at{" "}
          <Link href={"mailto:alfredo012017@yahoo.com"}>
            alfredo012017@yahoo.com
          </Link>
          .
        </p>
      </div>
    </section>
  );
};

export default privacyPolicy;
