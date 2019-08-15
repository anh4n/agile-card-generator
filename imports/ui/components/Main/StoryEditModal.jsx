import React, { useEffect } from 'react';
import { withTracker } from 'meteor/react-meteor-data';
import PropTypes from 'prop-types';
import Button from 'antd/lib/button';
import Form from 'antd/lib/form';
import Row from 'antd/lib/grid/row';
import Col from 'antd/lib/grid/col';
import Tabs from 'antd/lib/tabs';
import Icon from 'antd/lib/icon';

import { TeamsCollection } from '../../../api/teams/teamsCollection';
import { ModalForm } from '../lib/Form/ModalForm';
import { CodeMirror } from '../lib/CodeMirror';
import { prettyJson, isJsonString } from '../../lib/jsonHelper';
import { PdfPreview } from './PdfPreview';

const TaskEditModal = (props) => {
    const { boardId, team, form, isSubscriptionReady } = props;
    const { getFieldDecorator } = form;

    if (!isSubscriptionReady) {
        return null;
    }

    useEffect(() => {
        form.resetFields();
    }, [boardId]);

    const storyTemplate = team.storyTemplate ? prettyJson(team.storyTemplate) : '';
    const styles = team.styles ? prettyJson(team.styles) : '';

    const onSaveClick = () => {
        return new Promise((resolve, reject) => {
            form.validateFields((err, { storyTemplate, styles }) => {
                if (!err) {
                    const storyTemplateAsString = JSON.stringify(JSON.parse(storyTemplate));
                    const stylesAsString = JSON.stringify(JSON.parse(styles));

                    Meteor.callPromise('team.upsert', {
                        ...team,
                        storyTemplate: storyTemplateAsString,
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
            title={'Story Template'}
            OpenButton={<Button disabled={isDisabled()} icon="edit">Edit Story Template</Button>}
            width={'90vw'}
            onSave={onSaveClick}
        >
            <Row>
                <Col xs={24} lg={10}>
                    <Tabs>
                        <Tabs.TabPane
                            tab={
                                <span><Icon type="build" />Template</span>
                            }
                            key="1"
                        >
                            {getFieldDecorator('storyTemplate', {
                                initialValue: storyTemplate,
                                rules: [
                                    {
                                        validator: isJsonString,
                                        message: 'JSON not valid'
                                    }
                                ]
                            })(<CodeMirror />)}
                        </Tabs.TabPane>
                        <Tabs.TabPane
                            tab={
                                <span><Icon type="bg-colors" />Styles</span>
                            }
                            key="2"
                        >
                            {getFieldDecorator('styles', {
                                initialValue: styles,
                                rules: [
                                    {
                                        validator: isJsonString,
                                        message: 'JSON not valid'
                                    }
                                ]
                            })(<CodeMirror />)}
                        </Tabs.TabPane>
                    </Tabs>
                </Col>
                <Col xs={24} lg={14}>
                    <PdfPreview boardId={boardId} value={form.getFieldValue('storyTemplate')} styles={form.getFieldValue('styles')} isStory />
                </Col>
            </Row>
        </ModalForm>
    );
};

TaskEditModal.defaultProps = {
    team: {}
};

TaskEditModal.propTypes = {
    team: PropTypes.object
};

export default withTracker(({ boardId }) => {
    const handle = Meteor.subscribe('teams');

    return {
        isSubscriptionReady: handle.ready(),
        team: TeamsCollection.findOne({ boardId }),
    };
})(Form.create({ name: 'story-edit-form' })(TaskEditModal));
