const Activation = () => {
  return (
    <div className="mw-sm m-auto mt-5 p-5 shadow-sm text-center">
      <h1>Activate your account</h1>
      <p className="fs-5 mt-4">
        We&apos;ve sent you a link in your email to confirm your account
      </p>
      <p className="text-secondary mt-5">
        <b>Haven&apos;t received an email?</b>&nbsp;&nbsp;
        <button className="d-inline-flex link">Resend activation link</button>
      </p>
    </div>
  );
};

export default Activation;
