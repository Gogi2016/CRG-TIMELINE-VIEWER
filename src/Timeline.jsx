import { useEffect, useState } from 'react';

function Timeline() {
  const [timeline, setTimeline] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch('https://arthurfrost.qflo.co.za/php/getTimeline.php')
      .then(res => res.json())
      .then(data => {
        console.log('Fetched data:', data);  // For debugging
        // Adjust this depending on actual JSON structure:
        setTimeline(data.Timeline || data || []);
      })
      .catch(err => {
        console.error('Error:', err);
      })
      .finally(() => setLoading(false));
  }, []);

  if (loading) return <p>Loading...</p>;
  if (timeline.length === 0) return <p>No timeline data available.</p>;

  return (
    <div style={{ padding: '20px' }}>
      <h1>Timeline</h1>
      {timeline.map((item, index) => (
        <div key={index} style={{ border: '1px solid #ccc', marginBottom: '20px', padding: '10px' }}>
          {Object.entries(item).map(([key, value]) => {
            if (key === 'Image' || key === 'Icon') {
              return (
                <div key={key}>
                  <strong>{key}:</strong><br />
                  <img
                    src={`https://arthurfrost.qflo.co.za/Images/${value}`}
                    alt={key}
                    style={{ maxWidth: '300px', marginBottom: '10px' }}
                  />
                </div>
              );
            }

            if (key === 'Audio') {
              return (
                <div key={key}>
                  <strong>{key}:</strong><br />
                  <audio controls>
                    <source src={`https://arthurfrost.qflo.co.za/MP3/${value}`} type="audio/mpeg" />
                    Your browser does not support the audio element.
                  </audio>
                </div>
              );
            }

            return (
              <div key={key}>
                <strong>{key}:</strong> {value?.toString()}
              </div>
            );
          })}
        </div>
      ))}
    </div>
  );
}

export default Timeline;
