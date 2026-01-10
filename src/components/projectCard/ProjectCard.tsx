interface ProjectProp {
  image: string;
  name: string;
}

const projectCard = ({ image, name }: ProjectProp) => {
  return (
    <div className="bg-secondary aspect-[3/2] h-full  relative text-black flex justify-center text-[30px] select-none pointer-events-none overflow-hidden">
      <label>{name}</label>
      <img
        src={image}
        alt={name}
        className="absolute bottom-0 left-1/2 -translate-x-[50%] w-full h-auto object-cover"
      />
    </div>
  );
};

export default projectCard;
