const Response_display = ({ responses }) => {
  return (
    <>
      <div className="flex gap-4 items-center">
        <p className="text-xl">Responses: </p>
        <div className="flex flex-col">
          {responses.map((response) => {
            return (
              <div className="flex gap-1 items-center">
                <p className="text-xl font-bold">{response.username} :</p>
                {response.correct ? (
                  <p className="text-xl">correct</p>
                ) : (
                  <p className="text-xl">Incorrect</p>
                )}
                {response.time !== 0 ? (
                  <p className="text">({response.time} seconds) </p>
                ) : (
                  <p>No Time</p>
                )}
              </div>
            );
          })}
        </div>
      </div>
    </>
  );
};

export default Response_display;
