const { ApolloServer, gql } = require("apollo-server");

const typeDefs = `
# comments in GraphQl

    #Course type
    type Course {
        id: Int
        title: String
        author: String
        description: String
        topic: String
        url: String
    }

    #query type
    type Query {
        courses(topic: String): [Course]
        course(id: Int!): Course
    }

    type Mutation {
        updateTopic(id: Int!, topic: String!) : Course
    }
`;

const coursesData = [
	{
		id: 1,
		title: "The Complete Node.js Developer Course",
		author: "Andrew Mead, Rob Percival",
		description:
			"Learn Node.js by building real-world applications with Node, Express, MongoDB, Mocha, and more!",
		topic: "Node.js",
		url: "https://codingthesmartway.com/courses/nodejs/",
	},
	{
		id: 2,
		title: "Node.js, Express & MongoDB Dev to Deployment",
		author: "Brad Traversy",
		description:
			"Learn by example building & deploying real-world Node.js applications from absolute scratch",
		topic: "Node.js",
		url: "https://codingthesmartway.com/courses/nodejs-express-mongodb/",
	},
	{
		id: 3,
		title: "JavaScript: Understanding The Weird Parts",
		author: "Anthony Alicea",
		description:
			"An advanced JavaScript course for everyone! Scope, closures, prototypes, this, build your own framework, and more.",
		topic: "JavaScript",
		url: "https://codingthesmartway.com/courses/understand-javascript/",
	},
];

const resolvers = {
	Query: {
		course(parent, args, context, info) {
			
			const id = args.id;
			return coursesData.filter((course) => {
				return course.id == id;
			})[0];
		},
		courses(parent, args, context, info) {
			
			if ( args.topic) {
				const topic = args.topic;
				return coursesData.filter((course) => course.topic === topic);
			} else {
				return coursesData;
			}
		},
	},

    Mutation: {
        updateTopic(_, args, context, info) {
            const {id, topic} = args;

            coursesData.forEach((course) => {
                if (course.id === id) {
                    course.topic = topic;
                    return course;
                }
            });
            console.log(coursesData);
            return coursesData.filter(course => course.id === id)[0];
        },
    },
};

const server = new ApolloServer({
	typeDefs,
	resolvers,
});

server.listen().then((data) => {
	console.log(`Server ready at ${data.url}`);
});
