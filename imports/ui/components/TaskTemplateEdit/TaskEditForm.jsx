import React, { useEffect, useImperativeHandle } from 'react';
import { withTracker } from 'meteor/react-meteor-data';
import PropTypes from 'prop-types';
import Form from 'antd/lib/form';
import Row from 'antd/lib/grid/row';
import Col from 'antd/lib/grid/col';
import Tabs from 'antd/lib/tabs';
import Icon from 'antd/lib/icon';

import { TeamsCollection } from '../../../api/teams/teamsCollection';
import { CodeMirror } from '../lib/CodeMirror';
import { prettyJson, isJsonString } from '../../lib/jsonHelper';
import { PdfPreview } from '../common/PdfPreview';
import Spin from 'antd/lib/spin';

const TaskEditForm = (props) => {
    const { forwardedRef, boardId, team, form, isSubscriptionReady } = props;
    const { getFieldDecorator } = form;

    useEffect(() => {
        form.resetFields();
    }, [boardId]);

    const taskTemplate = team.taskTemplate ? prettyJson(team.taskTemplate) : '';
    const styles = team.styles ? prettyJson(team.styles) : '';

    useImperativeHandle(forwardedRef, () => ({
        save() {
            return new Promise((resolve, reject) => {
                form.validateFields((err, { taskTemplate, styles }) => {
                    if (!err) {
                        const taskTemplateAsString = JSON.stringify(JSON.parse(taskTemplate));
                        const stylesAsString = JSON.stringify(JSON.parse(styles));

                        Meteor.callPromise('team.upsert', {
                            ...team,
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
        }
    }));

    return (
        <Spin tip={'Loading...'} spinning={!isSubscriptionReady}>
            <Form>
                <Row>
                    <Col xs={24} lg={10}>
                        <Tabs>
                            <Tabs.TabPane
                                tab={
                                    <span><Icon type="build" />Template</span>
                                }
                                key="1"
                            >
                                {getFieldDecorator('taskTemplate', {
                                    initialValue: taskTemplate,
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
                        <PdfPreview value={form.getFieldValue('taskTemplate')}
                            styles={form.getFieldValue('styles')} />
                    </Col>
                </Row>
            </Form>
        </Spin>
    );
};

TaskEditForm.defaultProps = {
    team: {}
};

TaskEditForm.propTypes = {
    team: PropTypes.object
};

export default withTracker(({ boardId }) => {
    const handle = Meteor.subscribe('teams');

    return {
        isSubscriptionReady: handle.ready(),
        team: TeamsCollection.findOne({ boardId }),
    };
})(Form.create({ name: 'task-edit-form' })(TaskEditForm));
