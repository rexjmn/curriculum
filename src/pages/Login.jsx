import React from "react";

export default function Login({
  handlesubmit,
  password,
  username,
  setUsername,
  setPassword,
}) {
  return (
    <div className=" flex justify-center items-center h-screen flex-row">
      <form className="w-{350px} flex flex-col gap-3" onSubmit={handlesubmit}>
        <input
          type="text"
          placeholder="Saisir le nom de l'utilisateur"
          value={username}
          onChange={setUsername}
          className="w-[300px] input input-bordered border-solid border-black h-[40px] "
        />
        <input
          type="password"
          placeholder="Saisir le mot de passe"
          onChange={setPassword}
          value={password}
          className="w-[300px] input input-bordered border-solid border-black h-[40px]"
        />
        <button

          className="w-[300px] btn btn-primary rounded-3xl bg-blue-600"
        >
          Se connecter
        </button>
      </form>
    </div>
  );
}
