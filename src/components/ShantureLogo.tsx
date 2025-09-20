const ShantureLogo = ({ className = "" }: { className?: string }) => {
  return (
    <div className={`flex items-center gap-3 ${className}`}>
      <div className="relative">
        <div className="w-8 h-8 bg-gradient-to-r from-primary to-secondary rounded-lg flex items-center justify-center shadow-lg">
          <div className="w-5 h-5 bg-gradient-to-br from-accent to-primary rounded-md opacity-80"></div>
        </div>
        <div className="absolute -top-1 -right-1 w-3 h-3 bg-gradient-to-r from-secondary to-accent rounded-full opacity-70"></div>
      </div>
      <span className="text-2xl font-bold bg-gradient-to-r from-primary to-secondary bg-clip-text text-transparent">
        Shanture
      </span>
    </div>
  );
};

export default ShantureLogo;