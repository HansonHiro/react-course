import { useState, useEffect } from "react";
import MeetupList from "../components/meetups/MeetupList";
// useEffect is used to run the code under certain conditions.
function AllMeetupsPage() {
  const [isLoading, setIsLoading] = useState(true);
  const [loadedMeetups, setLoadedMeetups] = useState([]);
  useEffect(() => {
    setIsLoading(true);
    fetch(
      "https://react-getting-started-6c025-default-rtdb.firebaseio.com/meetups.json"
    )
      .then((response) => {
        return response.json();
      })
      .then((data) => {
        const meetups = []; //transform the data once it is fetched.
        for (const key in data) {
          // for every key in the data
          const meetup = {
            //for every meetup in the firebase, distribute data key into the object.
            id: key,
            ...data[key],
          };
          meetups.push(meetup);
        }
        setIsLoading(false); //set the loading to false if we have the data
        setLoadedMeetups(meetups);
      });
  }, []); // empty array so this useEffect will only run once when it is getting loaded.

  if (isLoading) {
    return (
      <section>
        <p>Loading...</p>
      </section>
    );
  } //until this is the first argument where the fetch always runs, after this is the condition.

  return (
    <section>
      <h1>All Meetups Page</h1>
      <MeetupList meetups={loadedMeetups} />
    </section>
  );
}
export default AllMeetupsPage;
