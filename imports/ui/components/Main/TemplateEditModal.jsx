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
import { prettyJson, isJsonString } from '../../lib/jsonHelper';

const TemplateEditModal = (props) => {
    const { boardId, team, form, isSubscriptionReady } = props;
    const { getFieldDecorator } = form;

    if (!isSubscriptionReady) {
        return null;
    }

    useEffect(() => {
        form.resetFields();
    }, [boardId]);

    const styles = team.styles ? prettyJson(team.styles) : '';

    const onSaveClick = () => {
        return new Promise((resolve, reject) => {
            form.validateFields((err, { styles }) => {
                if (!err) {
                    const stylesAsString = JSON.stringify(JSON.parse(styles));

                    Meteor.callPromise('team.upsert', {
                        ...team,
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
            title={'Template Styles'}
            OpenButton={<Button disabled={isDisabled()} icon="edit">Edit Styles</Button>}
            width={'90vw'}
            onSave={onSaveClick}
        >
            <Row>
                <Col xs={24}>
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
