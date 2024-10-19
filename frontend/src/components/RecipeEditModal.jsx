import React from "react";
import { Modal, Form, Input, Button } from "antd";
const { TextArea } = Input;

const RecipeEditModal = ({
    visible,
    onCancel,
    onUpdate,
    editedRecipe,
    setEditedRecipe,
}) => {
    return (
        <Modal
            title="Edit Recipe"
            visible={visible}
            onOk={onUpdate}
            onCancel={onCancel}
            bodyStyle={{ backgroundColor: "#ffffff", padding: "20px" }}
            footer={[
                <Button key="back" onClick={onCancel} style={{ color: "#ff5e57", border: "1px solid #ff5e57" }}>
                    Cancel
                </Button>,
                <Button key="submit" type="primary" onClick={onUpdate} style={{ backgroundColor: "#ff5e57", borderColor: "#ff5e57" }}>
                    Update
                </Button>,
            ]}
        >
            <Form layout="vertical">
                <Form.Item label="Name" required>
                    <Input
                        value={editedRecipe.name}
                        onChange={(e) =>
                            setEditedRecipe({ ...editedRecipe, name: e.target.value })
                        }
                        style={{ borderRadius: "8px", border: "1px solid #ccc" }}
                    />
                </Form.Item>
                <Form.Item label="Description" required>
                    <Input
                        value={editedRecipe.description}
                        onChange={(e) =>
                            setEditedRecipe({
                                ...editedRecipe,
                                description: e.target.value,
                            })
                        }
                        style={{ borderRadius: "8px", border: "1px solid #ccc" }}
                    />
                </Form.Item>
                <Form.Item label="Ingredients" required>
                    <Input
                        value={editedRecipe.ingredients ? editedRecipe.ingredients : ""}
                        onChange={(e) =>
                            setEditedRecipe({
                                ...editedRecipe,
                                ingredients: e.target.value.split(",").map((ing) => ing.trim()),
                            })
                        }
                        placeholder="Enter ingredients separated by commas"
                        style={{ borderRadius: "8px", border: "1px solid #ccc" }}
                    />
                </Form.Item>
                <Form.Item label="Instructions" required>
                    <TextArea
                        value={editedRecipe.instructions}
                        onChange={(e) =>
                            setEditedRecipe({
                                ...editedRecipe,
                                instructions: e.target.value,
                            })
                        }
                        rows={4}
                        style={{ borderRadius: "8px", border: "1px solid #ccc" }}
                    />
                </Form.Item>
                <Form.Item label="Cooking Time (minutes)" required>
                    <Input
                        type="number"
                        value={editedRecipe.cookingTime}
                        onChange={(e) =>
                            setEditedRecipe({
                                ...editedRecipe,
                                cookingTime: parseInt(e.target.value, 10),
                            })
                        }
                        style={{ borderRadius: "8px", border: "1px solid #ccc" }}
                    />
                </Form.Item>
            </Form>
        </Modal>
    );
};

export default RecipeEditModal;
