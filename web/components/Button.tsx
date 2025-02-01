interface ButtonProps {
    name: string;
}

const Button = ({ name }: ButtonProps) => {
    return (
        <button className="px-6 py-2 mt-12 font-archivo flex gap-x-4 items-center text-black font-bold text-lg border-4 border-black bg-white shadow-[6px_6px_0px_0px_rgba(0,0,0,1)] hover:slide-out-to-left-0.5 hover:shadow-[10px_10px_0px_0px_rgba(0,0,0,1)] active:shadow-[2px_2px_0px_0px_rgba(0,0,0,1)] transition-all">
        <span>{name}</span>       
         </button>
    );
}

export default Button;