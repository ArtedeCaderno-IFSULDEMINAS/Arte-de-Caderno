import { toast } from "react-toastify";

const customId = "ArteDeCaderno"

export const throwToast = {
    error: function (txt) {
        toast.error(txt, { toastId: customId });
    },
    success: function (txt) {
        toast.success(txt, { toastId: customId })
    },
    info: function (txt) {
        toast.info(txt, { toastId: customId })
    },
    warning: function (txt) {
        toast.warn(txt, { toastId: customId })
    },
    promise: function (promise, loading, success, error) {
        toast.promise(promise, {
            pending: loading,
            success: success,
            error: error
        }, {
            toastId: customId
        })
    }
}