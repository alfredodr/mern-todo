import React from "react";
import Link from "next/link";

const termsOfService = () => {
  return (
    <section className="bg-gray-100 min-h-screen p-8">
      <div className="bg-white p-8 rounded shadow-md">
        <h1 className="text-2xl font-bold mb-4">
          Terms of Service for Todo Tasker
        </h1>
        <p className="mb-4">
          <strong>Effective Date: 8.9.23</strong>
        </p>

        <p className="mb-4">
          Welcome to Todo Tasker. These Terms of Service (&quot;Terms&quot;)
          govern your use of our web application. Please read them carefully.
        </p>

        <h2 className="text-xl font-semibold mt-4 mb-2">
          1. Acceptance of Terms
        </h2>
        <p className="mb-4">
          By accessing or using Todo Tasker, you agree to be bound by these
          Terms. If you do not agree, you may not use our application.
        </p>

        <h2 className="text-xl font-semibold mt-4 mb-2">
          2. Registration and Account
        </h2>
        <p className="mb-2">
          2.1 Account Creation: You can register using an email address or
          through third-party platforms such as Google, Facebook, and Github.
        </p>
        <p className="mb-4">
          2.2 Account Security: You are responsible for safeguarding your
          password and any other credentials used to access your account. You
          must promptly notify us of any unauthorized use of your account.
        </p>

        <h2 className="text-xl font-semibold mt-4 mb-2">3. Login Dialog</h2>
        <p className="mb-2">
          3.1 Third-Party Login: If you choose to register or log in through a
          third-party platform, you grant us permission to access and use the
          information provided by these platforms, consistent with the
          permissions you grant on those platforms and their privacy policies.
        </p>
        <p className="mb-4">
          3.2 Email Login: If you register using an email, you agree to provide
          a valid email address and to keep this address updated.
        </p>

        <h2 className="text-xl font-semibold mt-4 mb-2">4. App Details</h2>
        <p className="mb-2">
          4.1 Purpose: This application is designed for personal use to manage
          todo lists.
        </p>
        <p className="mb-2">
          4.2 Data Collection: We collect data related to your tasks,
          preferences, and interactions with the application to provide and
          improve the service.
        </p>
        <p className="mb-4">
          4.3 Restrictions: You may not use the application for any illegal or
          unauthorized purpose.
        </p>

        <h2 className="text-xl font-semibold mt-4 mb-2">5. User Conduct</h2>
        <p className="mb-4">
          You must not misuse our application, engage in any activity that harms
          or disrupts it, or violate any applicable laws.
        </p>

        <h2 className="text-xl font-semibold mt-4 mb-2">6. Termination</h2>
        <p className="mb-4">
          We reserve the right to suspend or terminate your account if you
          violate any terms of these Terms or for any other reason at our sole
          discretion.
        </p>

        <h2 className="text-xl font-semibold mt-4 mb-2">
          7. Changes to These Terms
        </h2>
        <p className="mb-4">
          We may modify these Terms at any time. We will post the revised Terms
          on this page and update the &quot;Effective Date&quot;. Your continued
          use of the application signifies your acceptance of the revised terms.
        </p>

        <h2 className="text-xl font-semibold mt-4 mb-2">
          8. Limitation of Liability
        </h2>
        <p className="mb-4">
          To the fullest extent permitted by applicable law, Todo Tasker shall
          not be liable for any indirect, incidental, special, consequential, or
          punitive damages, or any loss of profits or revenues, whether incurred
          directly or indirectly.
        </p>

        <h2 className="text-xl font-semibold mt-4 mb-2">
          9. Governing Law and Jurisdiction
        </h2>
        <p className="mb-4">
          These Terms are governed by the laws of the state of Florida, without
          regard to its conflict of laws principles. Any disputes arising from
          or relating to these Terms or your use of the application will be
          subject to the exclusive jurisdiction of the state and federal courts
          located in Florida.
        </p>

        <h2 className="text-xl font-semibold mt-4 mb-2">10. Miscellaneous</h2>
        <p className="mb-4">
          If any provision of these Terms is found to be unenforceable, the
          remaining provisions will remain in full force and effect. These Terms
          constitute the entire agreement between you and Todo Tasker regarding
          your use of our application.
        </p>

        <h2 className="text-xl font-semibold mt-4 mb-2">11. Contact</h2>
        <p>
          For questions about these Terms, please contact us at{" "}
          <Link href={"mailto:alfredo012017@yahoo.com"}>
            alfredo012017@yahoo.com
          </Link>
          .
        </p>
      </div>
    </section>
  );
};

export default termsOfService;
