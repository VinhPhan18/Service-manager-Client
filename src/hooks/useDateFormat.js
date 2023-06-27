import { useEffect, useState } from 'react';

function useDateFormat(initialTimeString) {
  const [formattedDate, setFormattedDate] = useState('');

  useEffect(() => {
    const convertDateFormat = () => {
      const dateObj = new Date(initialTimeString);
      const day = dateObj.getUTCDate();
      const month = dateObj.getUTCMonth() + 1;
      const year = dateObj.getUTCFullYear();
      const formattedString = `${day}-${month}-${year}`;
      setFormattedDate(formattedString);
    };

    convertDateFormat();
  }, [initialTimeString]);

  return formattedDate;
}

export default useDateFormat