import React from 'react';
import {IntervieweeFeedback, InterviewerFeedback} from 'models/schedule';
import FrownIcon from '@rsuite/icons/legacy/FrownO';
import MehIcon from '@rsuite/icons/legacy/MehO';
import SmileIcon from '@rsuite/icons/legacy/SmileO';
import {Rate, Tooltip, Whisper} from 'rsuite';

const _renderCharacter = (value: number, _: number): JSX.Element => {
  // unselected character
  if (value === 0) {
    return <MehIcon />;
  }

  if (value < 3) {
    return <FrownIcon style={{color: '#ff9800'}} />;
  }
  if (value < 4) {
    return <MehIcon style={{color: '#F4CA1D'}} />;
  }
  return <SmileIcon style={{color: '#367E18'}} />;
};

const _tooltip = (text: string) => <Tooltip>{text}</Tooltip>;

export function IntervieweeRating(props: {
  feedback: IntervieweeFeedback;
  onChange: (arg: IntervieweeFeedback) => void;
}): JSX.Element {
  const feedback = props.feedback;
  return (
    <>
      <Whisper
        placement="top"
        controlId="control-id-click"
        trigger="hover"
        speaker={_tooltip(
          'How would you rate the candidates Approach towards the problem?',
        )}
      >
        <div>
          <strong>Approach: </strong>
          <Rate
            allowHalf
            defaultValue={feedback.approach}
            onChange={(value) => {
              feedback.approach = value;
              props.onChange(feedback);
            }}
            renderCharacter={_renderCharacter}
          />
        </div>
      </Whisper>
      <Whisper
        placement="top"
        controlId="control-id-click"
        trigger="hover"
        speaker={_tooltip(
          'How well did the candidate implement their approach?',
        )}
      >
        <div>
          <strong>Implmentation: </strong>
          <Rate
            allowHalf
            defaultValue={feedback.implementation}
            onChange={(value) => {
              feedback.implementation = value;
              props.onChange(feedback);
            }}
            renderCharacter={_renderCharacter}
          />
        </div>
      </Whisper>
      <Whisper
        placement="top"
        controlId="control-id-click"
        trigger="hover"
        speaker={_tooltip(
          'How well was the candidate communicating? \
          It can be assessed agnostic of language as well.',
        )}
      >
        <div>
          <strong>Communication: </strong>
          <Rate
            allowHalf
            defaultValue={feedback.communication}
            onChange={(value) => {
              feedback.communication = value;
              props.onChange(feedback);
            }}
            renderCharacter={_renderCharacter}
          />
        </div>
      </Whisper>
      <Whisper
        placement="top"
        controlId="control-id-click"
        trigger="hover"
        speaker={_tooltip(
          'Was the candidate able to navigate through the hints?',
        )}
      >
        <div>
          <strong>Hint Utilisation: </strong>
          <Rate
            allowHalf
            defaultValue={feedback.hintUtilisation}
            onChange={(value) => {
              feedback.hintUtilisation = value;
              props.onChange(feedback);
            }}
            renderCharacter={_renderCharacter}
          />
        </div>
      </Whisper>

      <Whisper
        placement="top"
        controlId="control-id-click"
        trigger="hover"
        speaker={_tooltip(
          'What would be the probability that the candidate\
           shall get hired considering their prep? Being candid helps.',
        )}
      >
        <div>
          <strong>Hire Probability: </strong>
          <Rate
            allowHalf
            defaultValue={feedback.hireProbability}
            onChange={(value) => {
              feedback.hireProbability = value;
              props.onChange(feedback);
            }}
            renderCharacter={_renderCharacter}
          />
        </div>
      </Whisper>
    </>
  );
}

export function InterviewerRating(props: {
  feedback: InterviewerFeedback;
  onChange: (arg: InterviewerFeedback) => void;
}): JSX.Element {
  const feedback = props.feedback;
  return (
    <>
      <Whisper
        placement="top"
        controlId="control-id-click"
        trigger="hover"
        speaker={_tooltip(
          'Did interviewer clearly mention expectations and the problem?\
           Please remember the problem may demand certain amount of ambiguity as well',
        )}
      >
        <div>
          <strong>Clarity: </strong>
          <Rate
            allowHalf
            defaultValue={feedback.clarity}
            onChange={(value) => {
              feedback.clarity = value;
              props.onChange(feedback);
            }}
            renderCharacter={_renderCharacter}
          />
        </div>
      </Whisper>
      <Whisper
        placement="top"
        controlId="control-id-click"
        trigger="hover"
        speaker={_tooltip(
          'How helpful was the interviewer while you were solving the problem?',
        )}
      >
        <div>
          <strong>Helpful: </strong>
          <Rate
            allowHalf
            defaultValue={feedback.helpful}
            onChange={(value) => {
              feedback.helpful = value;
              props.onChange(feedback);
            }}
            renderCharacter={_renderCharacter}
          />
        </div>
      </Whisper>
      <Whisper
        placement="top"
        controlId="control-id-click"
        trigger="hover"
        speaker={_tooltip('Was the interviewer prepared?')}
      >
        <div>
          <strong>Preparedness: </strong>
          <Rate
            allowHalf
            defaultValue={feedback.preparedness}
            onChange={(value) => {
              feedback.preparedness = value;
              props.onChange(feedback);
            }}
            renderCharacter={_renderCharacter}
          />
        </div>
      </Whisper>
      <Whisper
        placement="top"
        controlId="control-id-click"
        trigger="hover"
        speaker={_tooltip(
          'Was the interviewer respectful during the interview?',
        )}
      >
        <div>
          <strong>Respectful: </strong>
          <Rate
            allowHalf
            defaultValue={feedback.respectful}
            onChange={(value) => {
              feedback.respectful = value;
              props.onChange(feedback);
            }}
            renderCharacter={_renderCharacter}
          />
        </div>
      </Whisper>
    </>
  );
}
