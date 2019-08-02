import React, { useEffect } from 'react';
import PropTypes from 'prop-types';
import Button from 'antd/lib/button';
import { ModalForm } from '../lib/Form/ModalForm';
import Form from 'antd/lib/form';
import { TeamsCollection } from '../../../api/teams/teamsCollection';
import { withTracker } from 'meteor/react-meteor-data';
import Row from 'antd/lib/grid/row';
import Col from 'antd/lib/grid/col';
import { CodeMirror } from '../lib/CodeMirror';

const prettyJson = (jsonAsString) => {
    const jsonObject = JSON.parse(jsonAsString);
    return JSON.stringify(jsonObject, undefined, 4);
};

const isJsonString = (rule, value) => {
    try {
        const json = JSON.parse(value);
        return (typeof json === 'object');
    } catch (e) {
        return false;
    }
}

const TemplateEditModal = (props) => {
    const { boardId, team, form, isSubscriptionReady } = props;
    const { getFieldDecorator } = form;

    if (!isSubscriptionReady) {
        return null;
    }

    useEffect(() => {
        form.resetFields();
    }, [boardId]);

    const storyTemplate = team.storyTemplate ? prettyJson(team.storyTemplate) : '';
    const taskTemplate = team.taskTemplate ? prettyJson(team.taskTemplate) : '';
    const styles = team.styles ? prettyJson(team.styles) : '';

    const onSaveClick = () => {
        return new Promise((resolve, reject) => {
            form.validateFields((err, { storyTemplate, taskTemplate, styles }) => {
                if (!err) {
                    const storyTemplateAsString = JSON.stringify(JSON.parse(storyTemplate));
                    const taskTemplateAsString = JSON.stringify(JSON.parse(taskTemplate));
                    const stylesAsString = JSON.stringify(JSON.parse(styles));

                    Meteor.callPromise('team.upsert', {
                        ...team,
                        storyTemplate: storyTemplateAsString,
                        taskTemplate: taskTemplateAsString,
                        styles: stylesAsString
                    }).then(() => {
                        resolve()
                    }).catch((err) => {
                        reject(err);
                    });
                } else {
                    reject(err);
                }
            });
        });
    };

    const isDisabled = () => boardId === 0;

    return (
        <ModalForm
            title={'Templates'}
            OpenButton={<Button disabled={isDisabled()} icon="edit">Edit Templates</Button>}
            width={'90vw'}
            onSave={onSaveClick}
        >
            <Row>
                <Col xs={24} lg={12}>
                    <legend>Story Template</legend>
                    {getFieldDecorator('storyTemplate', {
                        initialValue: storyTemplate,
                        rules: [
                            {
                                validator: isJsonString,
                                message: 'JSON not valid'
                            }
                        ]
                    })(<CodeMirror />)}
                </Col>
                <Col xs={24} lg={12}>
                    <legend>Task Template</legend>
                    {getFieldDecorator('taskTemplate', {
                        initialValue: taskTemplate,
                        rules: [
                            {
                                validator: isJsonString,
                                message: 'JSON not valid'
                            }
                        ]
                    })(<CodeMirror />)}
                </Col>
                <Col xs={24} lg={24} style={{ marginTop: '10px' }}>
                    <legend>Template Styles</legend>
                    {getFieldDecorator('styles', {
                        initialValue: styles,
                        rules: [
                            {
                                validator: isJsonString,
                                message: 'JSON not valid'
                            }
                        ]
                    })(<CodeMirror />)}
                </Col>
            </Row>
        </ModalForm>
    );
};

TemplateEditModal.defaultProps = {
    team: {}
};

TemplateEditModal.propTypes = {
    team: PropTypes.object
};

export default withTracker(({ boardId }) => {
    const handle = Meteor.subscribe('teams');

    return {
        isSubscriptionReady: handle.ready(),
        team: TeamsCollection.findOne({ boardId }),
    };
})(Form.create({ name: 'template-form' })(TemplateEditModal));
