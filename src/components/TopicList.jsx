import { Link } from "react-router-dom";
import { useEffect, useState } from "react";
import  axios  from "axios";

function TopicList() {
    const [topics, setTopics] = useState([]);
    const [isLoading, setIsLoading] = useState(true);
    
    //fetch all available topics from backend
    useEffect(() => {
        axios.get(`https://project29-05.onrender.com/api/topics`)
        .then(({ data }) => {
            setTopics(data.topics);
            setIsLoading(false);
        });
    }, []);

    if (isLoading) {
        return <p> Loading topics... </p>;
    }

    return (
        <div>
            <h2> Available Topics </h2>
            <ul> {topics.map((topic) => 
                <li key={topic.slug}> 
                    <Link to={`/topics/${topic.slug}`}> {topic.slug}</Link> 
                </li>)} 
            </ul>
        </div>
    );
}

export default TopicList;