import React from 'react';
import { Modal, Divider, Typography, List } from 'antd';
import { CheckCircleOutlined } from '@ant-design/icons';
import '../styles/home.css';

const { Title, Paragraph, Text } = Typography;

const RecipeDetailsModal = ({ visible, onCancel, recipeDetails }) => {
    return (
        <Modal
            title={<Title level={3}>Recipe Details</Title>}
            visible={visible}
            onCancel={onCancel}
            footer={null}
            className="recipeDetailsModal"
        >
            <div className="recipeModalContent">
                <Title level={4} className="sectionTitle">Name</Title>
                <Paragraph><Text strong>{recipeDetails.name}</Text></Paragraph>
                <Divider />

                <Title level={4} className="sectionTitle">Description</Title>
                <Paragraph>{recipeDetails.description}</Paragraph>
                <Divider />

                <Title level={4} className="sectionTitle">Ingredients</Title>
                <List
                    dataSource={recipeDetails.ingredients || []}
                    renderItem={(item) => (
                        <List.Item>
                            <CheckCircleOutlined style={{ color: '#52c41a' }} /><Text>{item}</Text>
                        </List.Item>
                    )}
                    className="ingredientsList"
                />
                <Divider />

                <Title level={4} className="sectionTitle">Instructions</Title>
                <Paragraph>{recipeDetails.instructions}</Paragraph>
            </div>
        </Modal>
    );
};

export default RecipeDetailsModal;
