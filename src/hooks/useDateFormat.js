import { useEffect, useState } from 'react';

function useDateFormat(initialTimeString) {
  const [formattedDate, setFormattedDate] = useState('');

  useEffect(() => {
    const convertDateFormat = () => {
      const dateObj = new Date(initialTimeString);
      const day = String(dateObj.getUTCDate()).padStart(2, "0");
      const month = String(dateObj.getUTCMonth() + 1).padStart(2, "0");
      const year = dateObj.getUTCFullYear();
      const formattedString = `${year}-${month}-${day}`;
      setFormattedDate(formattedString);
    };

    convertDateFormat();
  }, [initialTimeString]);

  return formattedDate;
}

export default useDateFormat