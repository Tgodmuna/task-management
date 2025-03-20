import React, { useState, useContext, useCallback } from "react";
import { X, Loader2, Mail } from "lucide-react";
import axios from "axios";
import { toast } from "react-toastify";
import { AppContext } from "../App";
import useEnvironmentUrls from "../components/hooks/UseEnvironmentVar";
import { UseFetchToken } from "../components/hooks/UseFetchToken";

const Invitation: React.FC = () => {
  const appContext = useContext(AppContext);
  const { serverUrl } = useEnvironmentUrls();
  const token = UseFetchToken();

  const [email, setEmail] = useState("");
  const [loading, setLoading] = useState(false);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setEmail(e.target.value);
  };

  const handleSubmit = useCallback(
    async (e: React.FormEvent) => {
      e.preventDefault();

      if (!email) {
        toast.error("Email is required");
        return;
      }

      try {
        setLoading(true);
        const response = await axios.post(
          `${serverUrl}/api/task/inviteUser`,
          { email },
          { headers: { "x-auth-token": token } }
        );

        if (response.status === 200) {
          toast.success(response.data.message);
          appContext?.onInviteSent();
          return;
        }
      } catch (error) {
        const errorMsg = axios.isAxiosError(error)
          ? error.response?.data?.message || error.message || "Something went wrong"
          : "Something went wrong";
        toast.error(errorMsg);
        console.log(error);
      } finally {
        setLoading(false);
      }
    },
    [email, serverUrl, token, appContext]
  );

  if (!appContext) return null;

  return (
    <div
      className={`fixed w-full h-[100vh] inset-0 bg-black bg-opacity-50 items-center justify-center z-50 ${
        appContext.isInvite ? "flex" : "hidden"
      }`}>
      <form
        onSubmit={handleSubmit}
        className="bg-white p-4 rounded-lg shadow-md w-full max-w-2xl relative">
        <button
          title="close"
          type="button"
          className="absolute top-2 right-2 text-gray-500 hover:bg-neutral-800"
          onClick={appContext.onInviteSent}>
          <X className="w-6 h-6" />
        </button>
        <h2 className="text-lg font-semibold mb-4">Send Invitation</h2>

        <div className="flex items-center border p-2 rounded-md mb-4">
          <Mail className="text-gray-400 w-5 h-5 mr-2" />
          <input
            type="email"
            placeholder="User Email"
            className="w-full focus:outline-none"
            value={email}
            onChange={handleInputChange}
          />
        </div>

        <button
          disabled={loading}
          type="submit"
          className={`${
            loading && "cursor-not-allowed bg-slate-500"
          } mt-4 flex items-center gap-2 bg-blue-600 text-white px-4 py-2 rounded-md hover:bg-blue-700`}>
          {loading ? (
            <span className="flex">
              Sending Invitation <Loader2 className="animate-spin h-5 w-5 mx-auto" />
            </span>
          ) : (
            <span className="flex">Send Invitation</span>
          )}
        </button>
      </form>
    </div>
  );
};

export default React.memo(Invitation);
