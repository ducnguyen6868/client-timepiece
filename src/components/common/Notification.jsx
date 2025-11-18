import { useEffect } from "react";
import { CheckCircle, XCircle, AlertTriangle, Info } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";

const icons = {
  success: <CheckCircle className="w-5 h-5 text-green-500" />,
  error: <XCircle className="w-5 h-5 text-red-500" />,
  warning: <AlertTriangle className="w-5 h-5 text-yellow-500" />,
  info: <Info className="w-5 h-5 text-blue-500" />,
};

const bgColors = {
  success: "bg-green-50 dark:bg-green-900/20",
  error: "bg-red-50 dark:bg-red-900/20",
  warning: "bg-yellow-50 dark:bg-yellow-900/20",
  info: "bg-blue-50 dark:bg-blue-900/20",
};

export default function Notification({
  show = false,
  message = "",
  type = "success",
  onClose,
  duration = 2000,
}) {
  useEffect(() => {
    if (show && duration && onClose) {
      const timer = setTimeout(onClose, duration);
      return () => clearTimeout(timer);
    }
  }, [show, duration, onClose]);

  return (
    <AnimatePresence>
      {show && (
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -20 }}
          transition={{ duration: 0.5 }}
          className={`fixed top-6 right-6 z-50 flex items-center space-x-3 p-4 rounded-xl shadow-lg ${bgColors[type]} border border-gray-200 dark:border-gray-700`}
        >
          {icons[type]}
          <span className="text-gray-800 dark:text-gray-100 text-sm font-medium">
            {message}
          </span>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
