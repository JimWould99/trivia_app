const Response_display = ({ responses }) => {
  return (
    <>
      <div className="flex gap-4 items-center">
        <p className="text-xl">Responses: </p>
        <div className="flex flex-col">
          {responses.map((response) => {
            return (
              <div className="flex gap-1 items-center">
                {response.correct ? (
                  <>
                    <p className="text-xl font-bold text-green-600">
                      {response.username} :
                    </p>
                    <p className="text-xl text-green-600">correct</p>
                  </>
                ) : (
                  <>
                    <p className="text-xl font-bold text-red-600">
                      {response.username} :
                    </p>
                    <p className="text-xl text-red-600">Incorrect</p>
                  </>
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
