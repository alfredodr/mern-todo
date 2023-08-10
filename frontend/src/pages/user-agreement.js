import React from "react";
import Link from "next/link";

const userAgreement = () => {
  return (
    <div className="bg-gray-100 min-h-screen p-8">
      <div className="bg-white p-8 rounded shadow-md">
        <h1 className="text-2xl font-bold mb-4">
          User Agreement for Todo Tasker
        </h1>
        <p className="mb-4">
          <strong>Effective Date: 8.9.23</strong>
        </p>

        <p className="mb-4">
          Welcome to Todo Tasker. This User Agreement (&ldquo;Agreement&ldquo;)
          governs your use of our web application. Please read it carefully.
        </p>

        <h2 className="text-xl font-semibold mt-4 mb-2">
          1. Acceptance of Terms
        </h2>
        <p className="mb-4">
          By accessing or using Todo Tasker, you agree to be bound by the terms
          of this Agreement. If you do not agree, you may not use our
          application.
        </p>

        <h2 className="text-xl font-semibold mt-4 mb-2">
          2. Registration and Account
        </h2>
        <p className="mb-2">
          2.1 Account Creation: You can register using an email address or
          through third-party platforms such as Google and Github.
        </p>
        <p className="mb-4">
          2.2 Account Security: You are responsible for safeguarding your
          password and any other credentials used to access your account. You
          must promptly notify us of any unauthorized use of your account.
        </p>

        <h2 className="text-xl font-semibold mt-4 mb-2">
          3. Use of the Service
        </h2>
        <p className="mb-2">
          3.1 Personal Use: This application is for personal use only. Any
          commercial or unauthorized use is prohibited.
        </p>
        <p className="mb-4">
          3.2 Conduct: You must not misuse our application or engage in any
          activity that harms or disrupts it.
        </p>

        <h2 className="text-xl font-semibold mt-4 mb-2">4. Data and Privacy</h2>
        <p className="mb-4">
          Your use of our application is also governed by our Privacy Policy,
          which can be found at{" "}
          <Link href={"/privacy-policy"}>privacy policy</Link>.
        </p>

        <h2 className="text-xl font-semibold mt-4 mb-2">
          5. Third-Party Login
        </h2>
        <p className="mb-4">
          If you choose to register or log in through a third-party platform,
          you grant us permission to access and use the information provided by
          these platforms, consistent with the permissions you grant on those
          platforms and their privacy policies.
        </p>

        <h2 className="text-xl font-semibold mt-4 mb-2">6. Termination</h2>
        <p className="mb-4">
          We reserve the right to suspend or terminate your account if you
          violate any terms of this Agreement or for any other reason at our
          sole discretion.
        </p>

        <h2 className="text-xl font-semibold mt-4 mb-2">
          7. Changes to This Agreement
        </h2>
        <p className="mb-4">
          We may modify this Agreement at any time. We will post the revised
          Agreement on this page and update the &quot;Effective Date&quot;. Your
          continued use of the application signifies your acceptance of the
          revised terms.
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
          This Agreement is governed by the laws of the state of Florida,
          without regard to its conflict of laws principles. Any disputes
          arising from or relating to this Agreement or your use of the
          application will be subject to the exclusive jurisdiction of the state
          and federal courts located in Florida.
        </p>

        <h2 className="text-xl font-semibold mt-4 mb-2">10. Miscellaneous</h2>
        <p className="mb-4">
          If any provision of this Agreement is found to be unenforceable, the
          remaining provisions will remain in full force and effect. This
          Agreement constitutes the entire agreement between you and Todo Tasker
          regarding your use of our application.
        </p>

        <h2 className="text-xl font-semibold mt-4 mb-2">11. Contact</h2>
        <p>
          For questions about this Agreement, please contact us at{" "}
          <Link href={"mailto:alfredo012017@yahoo.com"}>
            alfredo012017@yahoo.com
          </Link>
          .
        </p>
      </div>
    </div>
  );
};

export default userAgreement;
