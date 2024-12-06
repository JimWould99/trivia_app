const Leaderboard_display = ({ users }) => {
  return (
    <>
      <div className="flex gap-4 items-center">
        <p className="text-xl">Leaderboard</p>
        <div className="flex flex-col">
          {Object.entries(users).map(([name, score]) => {
            return (
              <p className="text-xl">
                <p className="font-bold">{name}</p> : {score}
              </p>
            );
          })}
        </div>
      </div>
    </>
  );
};

export default Leaderboard_display;
