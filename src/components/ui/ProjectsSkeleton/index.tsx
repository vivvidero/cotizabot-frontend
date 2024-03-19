
const generateSkeletonBlocks = () => {
    const blockTemplate = [3, 2, 2, 2, 2, 1]; // Column spans for each block
    return blockTemplate.map((colSpan, index) => (
        <div key={index} className={`col-span-${colSpan} bg-gray-200 h-8 rounded`}></div>
    ));
};

export const ProjectsSkeleton = () => {
    return (
        <>
            {[...Array(5)].map((_, index) => (
                <div key={index} className="grid grid-cols-12 shadow-lg px-5 py-7 rounded-xl font-roboto text-lg bg-white items-center animate-pulse">
                    {generateSkeletonBlocks()}
                </div>
            ))}
        </>
    );
};
