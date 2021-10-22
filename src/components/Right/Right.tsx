import React from 'react';

export interface RightProps {
  className?: string;
}
export const Right: React.FC<RightProps> = () => {
  const [isShown, setIsShown] = React.useState<boolean>(false);

  return (
    <div className="hidden text-sm dark:text-black lg:w-1/6 sm:block md:w-1/6 2xl:w-1/6">
      <div className="text-center">
        <div className="p-4 bg-white rounded-lg shadow-lg ">
          <img
            className="m-auto w-28 h-28"
            src="https://res.cloudinary.com/practicaldev/image/fetch/s--EDoP9zp7--/c_limit%2Cf_auto%2Cfl_progressive%2Cq_auto%2Cw_350/https://res.cloudinary.com/practicaldev/image/fetch/s--otY2jCJh--/c_fill%2Cf_auto%2Cfl_progressive%2Ch_420%2Cq_auto%2Cw_420/https://dev-to-uploads.s3.amazonaws.com/uploads/podcast/image/235/08786d8b-7ef4-4c00-bc40-f4b3cbca5834.jpg"
          />
          <span className="font-bold ">Listen to DevDiscuss S6E6&#33;</span>
          <p className="text-xs">VS Code &amp; the Extended VS Code Universe</p>
        </div>
      </div>

      <div
        onMouseEnter={() => setIsShown(true)}
        onClick={() => setIsShown(false)}
        className="flex justify-center p-2 my-5 text-center text-white bg-blue-500 rounded-md cursor-pointer"
      >
        <button className="flex">
          See More
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className="w-6 h-6"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M19 13l-7 7-7-7m14-8l-7 7-7-7"
            />
          </svg>
        </button>
      </div>
      {isShown && (
        <div>
          <div className="my-10 ">
            <div className="p-4 bg-white rounded-lg shadow-lg ">
              <div className="flex justify-between border-b-2 border-gray-100 cursor-pointer">
                <span className="text-xl font-bold">Listings</span>
                <span className="text-blue-500">See All</span>
              </div>

              <div className="flex flex-col p-4 my-3 border-b-2 border-gray-100 cursor-pointer hover:bg-gray-50">
                <span className="font-bold hover:text-blue-600">
                  Free Live DevOps Careers Q&amp;A session
                </span>
                <span>events</span>
              </div>

              <div className="flex flex-col p-4 my-3 border-b-2 border-gray-100 cursor-pointer hover:bg-gray-50">
                <span className="font-bold hover:text-blue-600">
                  The Future of HTML Controls - Free Session - Sep 23, 1pm ET
                  (GMT -4)
                </span>
                <span>events</span>
              </div>

              <div className="flex flex-col p-4 my-3 border-b-2 border-gray-100 cursor-pointer hover:bg-gray-50">
                <span className="font-bold hover:text-blue-600">
                  ❗ ATTENTION ❗ DevTernity is coming!
                </span>
                <span>events</span>
              </div>

              <div className="flex flex-col p-4 my-3 border-b-2 border-gray-100 cursor-pointer hover:bg-gray-50">
                <span className="font-bold hover:text-blue-600">
                  CSSBattle 15 has begun! ⚔️
                </span>
                <span>events</span>
              </div>

              <div className="flex flex-col p-4 my-3 border-b-2 border-gray-100 cursor-pointer hover:bg-gray-50">
                <span className="font-bold hover:text-blue-600">
                  The Non-fiction Library
                </span>
                <span>products</span>
              </div>

              <div className="flex flex-col my-3 text-center cursor-pointer ">
                <span className="text-xl font-bold hover:text-blue-600">
                  Create a Listings
                </span>
              </div>
            </div>
          </div>

          <div className="text-center">
            <div className="p-4 bg-white rounded-lg shadow-lg ">
              <div className="flex justify-between border-b-2 border-gray-100 cursor-pointer">
                <span className="p-2 text-xl font-bold">#News</span>
              </div>
              <div className="border-b-2 border-gray-100 cursor-pointer ">
                <span className="block p-2 text-xl font-bold">
                  Save your application from crashing by wrong use of Web
                  Storage API or localStorage in browser
                </span>
                <span>2 comments</span>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
