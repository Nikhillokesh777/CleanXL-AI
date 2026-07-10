const Loader = ({ size = 'md', className = '' }) => {
  const sizes = { sm: 'h-5 w-5', md: 'h-8 w-8', lg: 'h-12 w-12', xl: 'h-16 w-16' };
  return (
    <div className={`relative ${sizes[size]} ${className}`}>
      <div className={`absolute inset-0 rounded-full border-2 border-blue-100`} />
      <div className={`absolute inset-0 rounded-full border-2 border-transparent border-t-blue-600 animate-spin`} />
    </div>
  );
};

export default Loader;
