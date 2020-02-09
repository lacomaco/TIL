import tensorflow as tf
tf.enable_eager_execution()

x_data =[1,2,3,4,5]
y_data =[1,2,3,4,5]

W=tf.Variable(2.9)
b=tf.Variable(0.5)

learning_rate = 0.01 
# Learning rate. 

for i in range(100):
    with tf.GradientTape() as tape:
        hypothesis = W * x_data + b
        cost = tf.reduce_mean(tf.square(hypothesis-y_data))


    W_grad , b_grad = tape.gradient(const,[W,b])

    W.assign_sub(learning_rate*W_grad)
    b.assign_sub(learning_rate*b_grad)
    if i%10==0:
        print("{:5}|{:10.4f}|{:10.4}|{:10.6f}".format(i,W.numpy(),b.numpy(),cost))