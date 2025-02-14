function CustomButton({ children, onClick }) {
    return (
      <button
        className="px-4 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600 transition"
        onClick={onClick}
      >
        {children}
      </button>
    );
  }
  
  export default CustomButton;