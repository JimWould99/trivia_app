const Leaderboard_display = ({ users }) => {
  let sortedUsers = [];
  for (let user in users) {
    sortedUsers.push([user, users[user]]);
  }
  sortedUsers.sort((a, b) => b[1] - a[1]);
  return (
    <>
      <div className="flex gap-4 items-center">
        <p className="text-xl">Leaderboard</p>
        <div className="flex flex-col">
          {sortedUsers.map((user, index) => {
            return (
              <div>
                <p className="font-bold text-2xl inline">{index + 1}.</p>{" "}
                <span className="inline font-bold text-2xl">{user[0]}: </span>
                <span className="inline">{Math.floor(user[1])} points</span>
              </div>
            );
          })}
        </div>
      </div>
    </>
  );
};

export default Leaderboard_display;
