import faker from "faker"
faker.locale = "nb_NO"

const models = {
  contact: () => ({
    Id: faker.random.uuid(),
    Name: faker.name.findName(),
    Title: faker.name.jobTitle(),
    Company: faker.company.companyName(),
    Phone: faker.phone.phoneNumber("########")
  })
}

export const fakeOne = (model) => models[model]()

export const fakeMany = (model, length) => Array.from({ length }, models[model])

export const fakeOneAsync = (model, timeout = 2500) => new Promise((r) => {
  const t = setTimeout(() => {
    r(models[model]())
    clearTimeout(t)
  }, timeout)
})

export const fakeManyAsync = (model, length, timeout = 2500) => new Promise.all(
  fakeMany(model, length).map(() => fakeOneAsync(model, timeout))
)

export const fakeFnAsync = (timeout = 1500, payload) => new Promise((r) => {
  const t = setTimeout(() => {
    r(payload)
    clearTimeout(t)
  }, timeout)
})
