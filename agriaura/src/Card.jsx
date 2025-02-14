const Card = ({ children, className = "" }) => (
    <div className={`bg-primary-light shadow-lg rounded-xl p-6 border border-primary ${className}`}>
        {children}
    </div>
);

export default Card;
