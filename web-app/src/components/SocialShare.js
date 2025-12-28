import React, { useState } from 'react';
import { useMutation } from '@apollo/client';
import gql from 'graphql-tag';
import { Button, Input, message } from 'antd';

const SHARE_PROGRESS = gql`
  mutation ShareProgress($userId: ID!, $progress: String!) {
    shareProgress(userId: $userId, progress: $progress) {
      success
      message
    }
  }
`;

const SocialShare = ({ userId }) => {
  const [progress, setProgress] = useState('');
  const [shareProgress, { loading }] = useMutation(SHARE_PROGRESS, {
    onCompleted: (data) => {
      if (data.shareProgress.success) {
        message.success('Progress shared successfully!');
        setProgress('');
      } else {
        message.error(data.shareProgress.message);
      }
    },
    onError: (error) => {
      message.error(`Error sharing progress: ${error.message}`);
    },
  });

  const handleShare = () => {
    if (!progress) {
      message.warning('Please enter your progress before sharing.');
      return;
    }
    shareProgress({ variables: { userId, progress } });
  };

  return (
    <div className="social-share">
      <Input.TextArea
        rows={4}
        value={progress}
        onChange={(e) => setProgress(e.target.value)}
        placeholder="Share your progress or challenges..."
      />
      <Button
        type="primary"
        onClick={handleShare}
        loading={loading}
        disabled={loading}
      >
        Share Progress
      </Button>
    </div>
  );
};

export default SocialShare;