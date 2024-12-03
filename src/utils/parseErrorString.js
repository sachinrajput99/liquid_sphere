export const parseErrorString = (errorString) => {
  const lines = errorString.split("\n");
  const getField = (line) => line.split(":")[1]?.trim(); // Helper function to get value after ":"

  return {
    errorType: lines[0].trim(),
    message: lines[1].trim(),
    requestArguments: {
      from: getField(lines[3]),
      to: getField(lines[4]),
      value: getField(lines[5]),
      data: getField(lines[6]),
    },
    contractCall: {
      address: getField(lines[9]),
      function: getField(lines[10]),
      sender: getField(lines[11]),
    },
    details: getField(lines[14]),
  };
};
