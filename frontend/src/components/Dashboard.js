import React, { useEffect, useState } from 'react';
import { gql, useQuery } from '@apollo/client';
import { Card, CardContent, Typography, CircularProgress } from '@mui/material';

const GET_HEALTH_METRICS = gql`
  query GetHealthMetrics {
    healthMetrics {
      id
      metricName
      value
      unit
    }
  }
`;

const Dashboard = () => {
  const { loading, error, data } = useQuery(GET_HEALTH_METRICS);
  const [metrics, setMetrics] = useState([]);

  useEffect(() => {
    if (data && data.healthMetrics) {
      setMetrics(data.healthMetrics);
    }
  }, [data]);

  if (loading) return <CircularProgress />;
  if (error) return <Typography color="error">Error loading metrics: {error.message}</Typography>;

  return (
    <div style={{ display: 'flex', flexDirection: 'column', padding: '20px' }}>
      <Typography variant="h4" gutterBottom>
        Health Metrics Dashboard
      </Typography>
      {metrics.map((metric) => (
        <Card key={metric.id} style={{ margin: '10px 0' }}>
          <CardContent>
            <Typography variant="h6">{metric.metricName}</Typography>
            <Typography variant="body1">
              {metric.value} {metric.unit}
            </Typography>
          </CardContent>
        </Card>
      ))}
    </div>
  );
};

export default Dashboard;