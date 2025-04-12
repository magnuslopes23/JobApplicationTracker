import toast from "react-hot-toast";

const baseOptions = {
  duration: 3000,
  position: "top-right",
};

const styleMap = {
  success: {
    icon: "✅",
    style: {
      background: "#e0f7f4",
      color: "#065f46",
      border: "1px solid #34d399",
    },
  },
  error: {
    icon: "❌",
    style: {
      background: "#fdecea",
      color: "#b91c1c",
      border: "1px solid #f87171",
    },
  },
  loading: {
    icon: "⏳",
    style: {
      background: "#fefce8",
      color: "#92400e",
      border: "1px solid #facc15",
    },
  },
};


export const showToast = (type, message) => {
  toast[type](message, { ...baseOptions, ...styleMap[type] });
};

export const showToastPromise = (promise, { loading, success, error }) => {
  return toast.promise(
    promise,
    {
      loading,
      success,
      error,
    },
    {
      style: {
        fontSize: "14px",
        border: "1px solid #ddd",
        padding: "12px 16px",
        borderRadius: "8px",
      },
      success: { icon: "✅" },
      error: { icon: "❌" },
      loading: { icon: "⏳" },
    }
  );
};
