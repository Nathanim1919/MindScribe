import { motion } from 'framer-motion';
import { FaRegCircleCheck } from "react-icons/fa6";


const plans = [
  {
    name: 'Free Forever',
    price: 'Free',
    features: [
      'Unlimited journaling',
      '2 Images per Entry',
      'Basic themes',
      'Basic moods',
      'Basic stats',
      'Basic reminders',
      'Private by default',
      'Basic themes',
    ],
    // gradient: 'from-[#000000] to-[#1c1c1d]',
  },
  {
    name: 'Supporter',
    price: '$4.99/mo',
    features: [
      'All Free features',
      'Custom moods',
      'Custom themes',
      'Unlimited images',
      'Custom reminders',
      'Custom stats',
      'Streak boosts',
      'Early feature access',
    ],
    gradient: 'from-[#f6d365] to-[#fda085]',
    // highlight: true,
  },
];

export const PlanSimplicity = () => {
  return (
    <section className="w-[80%] mx-auto bg-gradient-to-br dark:bg-dark-base relative z-999 bg-light-base overflow-hidden
    before:absolute before:w-[30%] before:h-[20%] before:bg-violet-500 before:top-[30%] before:left-[35%] before:rounded-full
    ">
      <div className="max-w-5xl mx-auto text-center grid place-items-center relative z-999 p-8 w-full h-full backdrop-blur-[7rem]">
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          transition={{ duration: 1 }}
          className="text-3xl md:text-9xl font-semibold text-gray-80 mb-10"
        >
          <h1  className="text-3xl md:text-9xl font-semibold text-dark-900">Just write</h1>
          <p className='text-5xl font-light'>We’ll take care of the rest.</p>
        </motion.div>

        <motion.p
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3, duration: 1 }}
          className="text-gray-500 text-lg md:text-xl mb-12 w-[50%]"
        >
          Whether you're journaling for clarity or just passing thoughts, there's a plan that lets you be you.
        </motion.p>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 w-[50%] place-items-center">
          {plans.map((plan, index) => (
            <motion.div
              key={index}
              whileHover={{ scale: 1.03 }}
              className={`rounded-3xl shadow-xl border p-6 w-full transition-all duration-300 cursor-pointer bg-gradient-to-br`}
            >
              <h3 className="text-2xl font-bold text-white mb-4">{plan.name}</h3>
              <p className="text-white text-xl mb-6">{plan.price}</p>
              <ul className="text-white">
                {plan.features.map((feature, i) => (
                  <div  key={i} className='flex items-center gap-2 p-2'>
                    <FaRegCircleCheck className="inline-block" />
                    <li className="text-sm  md:text-base">{feature}</li>
                  </div>
                ))}
              </ul>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};
